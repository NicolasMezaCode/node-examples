var express=require('express');
var app=express();
const {Pool}=require("pg");


const dbCredentials={
    user:"postgres",
    host:"localhost",
    database:"week4",
    port:5432,
}










app.listen(8080,()=>console.log("server running 8080"))