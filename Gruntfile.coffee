
module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON "tutor.jquery.json"
    banner: """
            /*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>
             * <%= pkg.homepage %>
             * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */
            """
    less:
      production:
        options:
          paths: ["src"]
          yuicompress: true
        files:
          "dist/jquery.tutor.min.css": "src/jquery.tutor.less"
    clean:
      files: ["dist"]
    uglify:
      options:
        banner: "<%= banner %>"
      dist:
        src: "src/jquery.tutor.js"
        dest: "dist/jquery.tutor.min.js"
    qunit:
      files: ["test/*.html"]

    # Run predefined tasks whenever watched file patterns are added, changed or deleted.
    watch:
      scripts:
        files: "src/**/*.js"
        tasks: ["uglify"]
        options:
          interrupt: true
      styles:
        files: "src/**/*.less"
        tasks: ["less"]
        options:
          interrupt: true

  grunt.loadNpmTasks "grunt-contrib-qunit"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "default", ["qunit", "clean", "less", "uglify"]

