exports.dataNotFound = (model , statuscode , message)=>{
    if(!model){
        const error = new Error(message);
        error.statuscode = statuscode;
        throw error
    }
    }
    exports.dataFound = (model , statuscode , message)=>{
    if(model){
        const error = new Error(message);
        error.statuscode = statuscode;
        throw error
    }
    }