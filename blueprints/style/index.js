var fs   = require('fs-extra');
var path = require('path');

module.exports = {
  availableCommands: [
    { name: 'add-manifest', type: Boolean, default: false }
  ],
  locals: function (options) {
    var name = options.entity.name.replace(/-/g, " ").replace(/\w\S*/g, function (str) {
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
    return {
      titledModuleName: name
    };
  },

  afterInstall: function (options) {
    if(options.addManifest) {
      addStyleToManifest(options.entity.name);
    }
  }
};

function addStyleToManifest (name) {
  var manifestPath = path.join(process.cwd(), 'app/styles/app', 'styles.less');

  var oldContent = fs.readFileSync(manifestPath, 'utf-8');
  var newContent = oldContent.replace(/(\/\/\sGenerated\n)/gm, '$1@import "' + name + '.less";\n');

  fs.writeFileSync(manifestPath, newContent);
}