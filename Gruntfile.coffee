shell   = require 'shelljs'
SemVer  = require('semver').SemVer
webpack = require 'webpack'

module.exports = (grunt) ->
  grunt.loadTasks file for file in grunt.file.expand 'node_modules/grunt-*/tasks'
  pkg = grunt.file.readJSON 'package.json'
  license = grunt.file.read 'LICENSE'
  bannerDate = if grunt.template.today('yyyy') isnt '2014' then ('-' + grunt.template.today('yyyy')) else ''
  banner = grunt.template.process(
    [
      '<%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>'
      '(c) 2014' + bannerDate + ' L.systems SARL, Etienne Folio, Quentin Raynaud'
      'https://bitbucket.org/lsystems/angular-extend-promises'
      'License: MIT'
    ].join('\n')
    data:
      pkg: pkg
      license: license
  )

  grunt.initConfig
    pkg: pkg

    jshint:
      options:
        reporter: require('jshint-stylish')
      client:
        src: 'src/**/*.js'
        options:
          jshintrc: '.jshintrc'
          verbose: true

    jscs:
      options:
        force: true,
        config: '.jscsrc'
      all:
        src: [
          'src/**/*.js',
          'tests/**/*.js'
        ]

    clean:
      options:
        force: true
      dist: 'dist/**/*'

    mochaProtractor:
      options:
        browsers: ['Chrome', 'Firefox']
      files: ['test/*.js']

    bumpup:
      files: ['package.json', 'bower.json']
      options:
        updateProps:
          pkg: 'package.json'

    webpack:
      options:
        entry: './src/index.js'
        output:
          path: 'dist'
          library: '<%= pkg.name %>'
          libraryTarget: 'umd'
        devtool: 'source-map'
        plugins: [
          new webpack.BannerPlugin(banner)
        ]
      default:
        output:
          filename: 'angular-extend-promises.js'
          sourceMapFilename: 'angular-extend-promises.js.map'
      defaultMin:
        output:
          filename: 'angular-extend-promises.min.js'
          sourceMapFilename: 'angular-extend-promises.min.js.map'
        plugins: [
          new webpack.optimize.UglifyJsPlugin()
        ]
      withoutLodash:
        output:
          filename: 'angular-extend-promises-without-lodash.js'
          sourceMapFilename: 'angular-extend-promises-without-lodash.js.map'
        externals: [
          /.*\/tmp\/lodash/
        ]
      withoutLodashMin:
        output:
          filename: 'angular-extend-promises-without-lodash.min.js'
          sourceMapFilename: 'angular-extend-promises-without-lodash.min.js.map'
        externals: [
          /.*\/tmp\/lodash/
        ]
        plugins: [
          new webpack.optimize.UglifyJsPlugin()
        ]

    karma:
      options:
        configFile: 'tests/karma.conf.coffee'
        browsers: [
          'PhantomJS',
          'Chrome',
          'Firefox'
        ]
        singleRun: true

      units1_3:
        options:
          files: [
            'bower_components/angular1.3/angular.js',
            'bower_components/angular-mocks1.3/angular-mocks.js'
            'dist/angular-extend-promises.js'
            'tests/units/**/*.js'
          ]

      functionals1_3:
        options:
          files: [
            'bower_components/angular1.3/angular.js',
            'bower_components/angular-mocks1.3/angular-mocks.js'
            'dist/angular-extend-promises.js'
            'tests/functionals/**/*.js'
          ]

      units1_2:
        options:
          files: [
            'bower_components/angular1.2/angular.js',
            'bower_components/angular-mocks1.2/angular-mocks.js'
            'dist/angular-extend-promises.js'
            'tests/units/**/*.js'
          ]

      functionals1_2:
        options:
          files: [
            'bower_components/angular1.2/angular.js',
            'bower_components/angular-mocks1.2/angular-mocks.js'
            'dist/angular-extend-promises.js'
            'tests/functionals/**/*.js'
          ]

  run = (cmd, msg) ->
    cmd = cmd.join('&&') if Array.isArray cmd
    res = shell.exec cmd
    grunt.log.writeln[!res.code ? 'ok' : 'ko'] msg if msg
    !res.code

  grunt.registerTask 'lodash', () ->
    grunt.file.mkdir 'tmp'
    run './node_modules/.bin/lodash include=' + [
      'constant'
      'defaults'
      'each'
      'extend'
      'filter'
      'isArray'
      'isEmpty'
      'isFunction'
      'isArguments'
      'keys'
      'map'
      'methods'
      'noop'
      'object'
      'pick'
      'reduce'
      'toArray'
      'values'
    ].join(',') + ' -o tmp/lodash.js'

  grunt.registerTask 'build', ['lodash', 'webpack']

  grunt.registerTask 'test', ['jshint', 'jscs', 'build', 'karma']

  grunt.registerTask 'default', ['clean', 'build']

  grunt.registerTask 'release', (type, step) ->
    type = type || 'patch'
    step = step || 'start'

    switch step
      when 'start'
        grunt.log.writeln 'Clean'
        grunt.task.run ['clean', 'release:' + type + ':prepare']

      when 'prepare'
        grunt.log.writeln 'Build & test & bump version…'

        run [
          'rm -fr dist && mkdir dist'
          'cd dist && git init && cd ..'
          'cp .git/config dist/.git/'
          'cp bower.json README.md dist/'
        ]

        tasks = [
          'test'
        ]

        if type isnt 'prerelease'
          tasks.unshift 'bumpup:' + type

        tasks.push 'release:' + type + ':commit'

        grunt.task.run tasks

      when 'commit'
        grunt.log.writeln 'Commit & push release…'

        newVer = grunt.config 'pkg.version'
        run [
          'cd dist'
          'git add -A'
          'git commit -m "Release v' + newVer + '" --no-verify'
          'git tag "v' + newVer + '"'
          'git push origin --tags -f'
        ]

        grunt.log.writeln 'Publish on NPM…'
        run [
          'rm dist/bower.json'
          'cp package.json dist/'
          'cd dist'
          'npm publish'
        ]

        version = new SemVer(grunt.config('pkg.version'))
        if type isnt 'prerelease'
          version.inc('patch')
          version.prerelease = ['pre']
        else
          version.inc('prerelease')

        grunt.log.writeln 'Bump new dev version…'
        grunt.task.run ['bumpup:' + version.format(), 'release:' + type + ':end']

      when 'end'
        run [
          'git add -A'
          'git commit -m "Bump version to v' + grunt.config('pkg.version') + ' in master" --no-verify'
          'git push origin master'
        ]
