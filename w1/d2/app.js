const http=require("http");
const fs=require("fs");

const server=http.createServer(async(request,response)=>{
    console.log("url",request.url)
    if (request.url==="/users"){
        if(request.method==="GET"){
            fs.readFile("users.json","utf8",(error,data)=>{
                if(error){
                    console.log("error on reading file")
                } else{
                    console.log("content file",data)
                    response.writeHead(200,{"content-type":"application/json"})
                    response.write(JSON.stringify(data));
                    response.end();
                }
            })
        }
        if(request.method==="POST"){
            const buffers=[];
            for await(const chunk of request){
                buffers.push(chunk)
            };
            const data =Buffer.concat(buffers).toString();
            const newUser=JSON.parse(data);
            response.end();
            fs.readFile("users.json","utf8",(error,data)=>{
                if(error){console.log(error)}
                else{
                    const objData=JSON.parse(data);
                    objData.users.push(newUser);
                    fs.writeFile("users.json",JSON.stringify(objData),(error)=>{
                        if(error){
                            console.log(error)
                        }else{
                            response.writeHead(201,{"content-type":"application/json"});
                            response.write(JSON.stringify(objData));
                            response.end();
                        }
                    })
                }
            })
        }
        if(request.method==="DELETE"){
            const buffers=[];
            for await(const chunk of request){
                buffers.push(chunk)
            };
            const data =Buffer.concat(buffers).toString();
            const newUser=JSON.parse(data);
            response.end();
            fs.readFile("users.json","utf8",(error,data)=>{
                if(error){console.log(error)}
                else{
                    const objData=JSON.parse(data);
                    const updatedObj=objData.filter((object)=>{
                        return object != newUser
                    })
                    fs.writeFile("users.json",JSON.stringify(updatedObj),(error)=>{
                        if(error){console.log(error)}
                        else{
                            response.writeHead(201,{"content-type":"application/json"});
                            response.write(JSON.stringify(updatedObj));
                            response.end();
                        }
                    })
                }

            })
        }
    }
})

server.listen(3000, () => console.log("server runnning on 3000"));