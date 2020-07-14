const mongoose = require('mongoose');
const e = require('express');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
require('../config/config');

function connect() {
    return new Promise((resolve, reject) => {
        //  if (process.env.NODE_ENV === 'test') {
        //     mockgoose.prepareStorage()
        //         .then((resp, error) => {
        //             mongoose.connect(process.env.URLDB,{ useNewUrlParser: true, useCreateIndex: true })
        //                 .then((res,err) => {
        //                     if (err) 
        //                         reject(err);
        //                     resolve();
        //                 })
        // } else {
            mongoose.connect(process.env.URLDB,{ useNewUrlParser: true, useCreateIndex: true })
                .then((res,err) => {
                    if (err) 
                        return reject(err);
                    resolve();
                })
        //}
    });
}
  

function close() {
   return mongoose.disconnect();
}
  
  module.exports = { connect, close };