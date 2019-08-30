"use strict";
var Generator = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    if (this.args.length > 0) {
      return;
    }

    var done = this.async();

    this.log(yosay("Welcome to the " + chalk.red("Component") + " generator!"));

    return this.prompt({
      type: "input",
      name: "name",
      message: "What will this be called (i.e. 'MenuItem')"
    }).then(answers => {
      this.answers = answers;
      done();
    });
  }

  writing() {
    const names = this.args.length > 0 ? this.args : [this.answers.name];

    names.forEach(name => {
      this.fs.copyTpl(
        this.templatePath("_Component.stories.tsx"),
        this.destinationPath(
          "src/components/" + name + "/" + name + ".stories.tsx"
        ),
        { name }
      );

      this.fs.copyTpl(
        this.templatePath("_Component.tsx"),
        this.destinationPath("src/components/" + name + "/" + name + ".tsx"),
        { name }
      );

      this.fs.copyTpl(
        this.templatePath("_index.ts"),
        this.destinationPath("src/components/" + name + "/" + "index.ts"),
        { name }
      );
    });
  }
};
