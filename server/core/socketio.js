/**
 * socket.io操作
 */
module.exports=(server)=>{
    const io=require('socket.io')(server)

    // 保存用户
    let users=[];

    // 判断是否存在user
    let findUser=(name,socket)=>{
        if(users.length>0){
            return users.find((item)=>{
                return item.name==name;
            })
        }else
            return undefined;
    }

    io.sockets.on('connection',(socket)=>{
        // 监听是否是新用户消息
        socket.on("newUser",(name)=>{
            if(users.length>0){
                let _result= users.findIndex((item)=>{
                    return item.name==name
                })
                if(_result>-1){
                    users.splice(_result,1);
                    users.push({name:name,socket:socket});
                }else
                    users.push({name:name,socket:socket});
            }else
                users.push({name:name,socket:socket});
        })

        // 监听客户端发送过来的消息
        socket.on("SenMsg",function(data){
            if(data.isall) // 群发
                io.sockets.emit("replyMsg",data);
            else{
                let _result = findUser(data.sendname,socket);
                if(_result){
                    _result.socket.emit('replyMsg',data)
                }
            }
        });
    })
}