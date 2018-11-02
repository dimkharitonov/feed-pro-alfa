import Rox from 'rox-browser';
import Cfg from "../config/config";

const myRox = {

  appFlags: {
    greetingsFlag: new Rox.Flag(),
    themeFlag: new Rox.Flag()
  },


  setup: function() {
    Rox.register('AppFlags', this.appFlags);
    Rox.setup(Cfg.roxkey).then(() => {
      console.log("after setup greetings", this.appFlags.greetingsFlag.isEnabled());
    });
  }


};

export default myRox;