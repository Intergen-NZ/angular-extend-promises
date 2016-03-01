'use strict';

describe('angularExtendPromisesProvider', function() {
  var angularExtendPromisesProvider;

  // Load infos about our module
  beforeEach(module('angular-extend-promises'));

  // Load the provider
  beforeEach(module(function(_angularExtendPromisesProvider_) {
    angularExtendPromisesProvider = _angularExtendPromisesProvider_;
  }));

  // Test options existence & default values
  describe('.options', function() {
    it('should be an object', inject(function() {
      expect(angularExtendPromisesProvider)
        .to.have.a.property('options')
        .that.is.an('Object')
      ;
    }));

    describe('.compatibilityAliases', function() {
      it('should be defaulting to true', inject(function() {
        expect(angularExtendPromisesProvider.options)
          .to.have.a.property('compatibilityAliases', true)
        ;
      }));

      it('should expose attempt on $q when true', inject(function($q) {
        expect($q).to.have.property('attempt');
      }));
      it('should not expose attempt on $q when false', inject(function() {
        angularExtendPromisesProvider.options.compatibilityAliases = false;
        inject(function($q) {
          expect($q).to.not.have.property('attempt');
        });
      }));

      it('should expose caught on $q promises when true', inject(function($q) {
        expect($q.defer().promise).to.have.property('caught');
      }));
      it('should not expose caught on $q promises when false', inject(function() {
        angularExtendPromisesProvider.options.compatibilityAliases = false;
        inject(function($q) {
          expect($q.defer().promise).to.not.have.property('caught');
        });
      }));

      it('should expose lastly on $q promises when true', inject(function($q) {
        expect($q.defer().promise).to.have.property('lastly');
      }));
      it('should not expose lastly on $q promises when false', inject(function() {
        angularExtendPromisesProvider.options.compatibilityAliases = false;
        inject(function($q) {
          expect($q.defer().promise).to.not.have.property('lastly');
        });
      }));

      it('should expose thenReturn on $q promises when true', inject(function($q) {
        expect($q.defer().promise).to.have.property('thenReturn');
      }));
      it('should not expose thenReturn on $q promises when false', inject(function() {
        angularExtendPromisesProvider.options.compatibilityAliases = false;
        inject(function($q) {
          expect($q.defer().promise).to.not.have.property('thenReturn');
        });
      }));

      it('should expose returns on $q promises when true', inject(function($q) {
        expect($q.defer().promise).to.have.property('returns');
      }));
      it('should not expose returns on $q promises when false', inject(function() {
        angularExtendPromisesProvider.options.compatibilityAliases = false;
        inject(function($q) {
          expect($q.defer().promise).to.not.have.property('returns');
        });
      }));

      it('should expose thenThrow on $q promises when true', inject(function($q) {
        expect($q.defer().promise).to.have.property('thenThrow');
      }));
      it('should not expose thenThrow on $q promises when false', inject(function() {
        angularExtendPromisesProvider.options.compatibilityAliases = false;
        inject(function($q) {
          expect($q.defer().promise).to.not.have.property('thenThrow');
        });
      }));
    });

    describe('.disableES5Methods', function() {
      it('should be defaulting to false', inject(function() {
        expect(angularExtendPromisesProvider.options)
          .to.have.a.property('disableES5Methods', false)
        ;
      }));

      it('should expose try on $q when false', inject(function($q) {
        expect($q).to.have.property('try');
      }));
      it('should not expose try on $q when true', inject(function() {
        angularExtendPromisesProvider.options.disableES5Methods = true;
        inject(function($q) {
          expect($q).to.not.have.property('try');
        });
      }));

      it('should expose catch on $q promises when false', inject(function($q) {
        expect($q.defer().promise).to.have.property('catch');
      }));
      it('should not expose catch on $q promises when true', inject(function() {
        angularExtendPromisesProvider.options.disableES5Methods = true;
        inject(function($q) {
          expect($q.defer().promise).to.not.have.property('catch');
        });
      }));

      it('should expose finally on $q promises when false', inject(function($q) {
        expect($q.defer().promise).to.have.property('finally');
      }));
      it('should not expose finally on $q promises when true', inject(function() {
        angularExtendPromisesProvider.options.disableES5Methods = true;
        inject(function($q) {
          expect($q.defer().promise).to.not.have.property('finally');
        });
      }));

      it('should expose return on $q promises when false', inject(function($q) {
        expect($q.defer().promise).to.have.property('return');
      }));
      it('should not expose return on $q promises when true', inject(function() {
        angularExtendPromisesProvider.options.disableES5Methods = true;
        inject(function($q) {
          expect($q.defer().promise).to.not.have.property('return');
        });
      }));

      it('should expose throw on $q promises when false', inject(function($q) {
        expect($q.defer().promise).to.have.property('throw');
      }));
      it('should not expose throw on $q promises when true', inject(function() {
        angularExtendPromisesProvider.options.disableES5Methods = true;
        inject(function($q) {
          expect($q.defer().promise).to.not.have.property('throw');
        });
      }));
    });
  });

  // Check that $get functions properly
  describe('.$get', function() {
    it('should expose the options as a service', inject(function(angularExtendPromises) {
      expect(angularExtendPromises).to.be.equal(angularExtendPromisesProvider.options);
    }));
  });
});
