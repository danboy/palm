require 'yaml'
require 'json'   # if this gem is not installed, then 'sudo gem install json'

=begin
 Usage:
  rake sources
  rake sources:all    // put all YAML entires in sources.json

  rake sources suites=name1,name2  // only put required & YAML entires name1 & name2 into sources.json
  rake sources:production // only put the app.yaml entries in sources.json

NOTE: jasmine, if present, will ALWAYS be placed at the beginning of sources.json array

 Format of YAML:
 jasmine:                                 // human name of the file, allows for trimming on cmd line
  source: vendor/pockets/jasmine/lib/jasmine.js     // path to the file to be includes
  scenes:                                 // optional YAML entry or array of scene names
    - test
    - main
  required: yes                           // optional: if required is true, this will always be included

=end

desc 'Compile sources.json, specifing a subset of files'
task :sources do
  begin
    output_all((ENV['suites'] || '').split(','))
  rescue Exception => e
    puts "Failed to make sources.json due to: #{e}."
  end
end

namespace :sources do
  desc 'Compile sources.json using all contents of sources.yaml'
  task :all do
    begin
      output_all
    rescue Exception => e
      puts "Failed to make sources.json due to: #{e}."
    end
  end
end

def output_all(suite_names = nil)
  output_json_file(
    load_app_yaml +
    load_yaml('', 'sources/pockets.yaml') +
    load_yaml('', 'sources/pockets-test.yaml') +
    load_yaml('vendor/pockets/', 'sources/pockets.yaml') +
    load_yaml('vendor/pockets/', 'sources/pockets-test.yaml') +
    load_helpers_and_suites_yaml(suite_names)
  )
end

def load_app_yaml
  all_app_sources = (FileList["lib/**/*.js"] + FileList["app/**/*.js"]).entries

  app_yaml = YAML.load_file('sources/app.yaml') if File.exists?('sources/app.yaml')
  app_yaml ||= {}
  scene_sources = app_yaml.values.flatten.uniq

  entries_without_scenes = all_app_sources.collect do |filename|
    {"source" => filename} unless scene_sources.include?(filename)
  end.compact

  scenes_by_file = Hash.new {|hash, key| hash[key] = []}
  app_yaml.each do |scene, files|
    files.each do |filename|
      scenes_by_file[filename]  << scene
    end
  end

  entries_with_scenes = scenes_by_file.collect do |filename, scenes|
    {"source" => filename, "scenes" => scenes}
  end

  entries_without_scenes + entries_with_scenes
end

def load_helpers_and_suites_yaml(suite_names)
  helpers = FileList["test/test_helpers/*.js"].collect {|filename| {"source"=> filename, "scenes" => "test"} } 
  suites = FileList["test/**/*.js"].exclude(/^test\/test_helpers/).collect {|filename| {"source" => filename, "scenes" => "test"}}
  if suite_names && suite_names.size > 0
    suites = suites.select do |suite|
      suite_names.include?(File.basename(suite["source"], ".js"))
    end
  end
  helpers + suites
end

def load_yaml(dir, filename)
  yaml = YAML.load_file(dir + filename) if File.exists?(dir + filename)
  yaml ||= []
  prepend_dir(yaml, dir) if !dir.empty?
  yaml
end

def prepend_dir(yaml, dir)
  yaml.entries.each {|entry| entry["source"] = dir + entry["source"]}
end

def sorted_by_source(hash)
  hash.entries.sort{|a,b|a['source'] <=> b['source']}
end

def output_json_file(sources)
  outfile = File.open('sources.json', 'w')
  outfile << JSON.pretty_generate(sources)
  outfile << "\n"
  outfile.close
  puts "Created sources.json."
end

