var path = require('path');

var config=null;
this.isInitialized = false;

var Configuration=function(){
     this.configFile=null;
     this.isInitialized=false;
};

Configuration.prototype.initialize=function(){
    this.configFile = require(path.join(__dirname, this.getEnv()));
    this.isInitialized=true;
};

Configuration.prototype.getCurrentConfig=function(){
  if (!this.isInitialized) {
    this.initialize();
  }
  return this.configFile;
};

Configuration.prototype.getEnv=function(){
    if(process.env.NODE_ENV=='dev'){
        return 'dev';
    }else if(process.env.NODE_ENV=='test'){
        return 'test';
    }else if(process.env.NODE_ENV=='swagger'){
        return 'swagger';
    }else{
        return 'test';
    }

    return 'test';
   
};

module.exports=(function(){
        if(!config){
            config=new Configuration();
        }
        return config;
})();

