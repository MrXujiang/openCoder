// 通过cluster启动多核的node提供web服务
const cluster = require('cluster');
const cpus = require('os').cpus();

const workers = [];

const masterProcess = () => {
    console.log(`一共有${cpus.length}个内核`);
    console.log(`master 主进程 ${process.pid} 启动`);

    for(let i=0; i< cpus.length;i++){
        console.log(`正在fork子进程${i}`);
        const worker = cluster.fork();
        workers.push(worker);

        worker.on('message', message => {
            console.log(`主进程 ${process.pid} 收到 ${JSON.stringify(message)}
            来自${worker.process.pid}`);
        });
    }

    workers.forEach(worker => {
        console.log(`主进程${process.pid} 发消息给子进程 ${worker.process.pid}`)
        worker.send({msg: `来自主进程的消息 ${process.pid}`})
    }, this)
    

    // process.exit()
}

const childProcess = () => {
    console.log(`master 子进程 ${process.pid} 启动并退出`);
    process.on('message', message => {
        console.log(`worker 子进程 ${process.pid} 收到消息 ${JSON.stringify(message)}`)
    })
    process.send({msg: `来自子进程的消息 ${process.pid}`})
}

if(cluster.isMaster) {
    masterProcess()
} else {
    childProcess()
}