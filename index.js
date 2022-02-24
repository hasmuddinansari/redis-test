const Redis = require("ioredis");
const redis = new Redis()
const classKey = 'data'
const {isEqual, set} = require('lodash')


const dataStore = {
    name:"Hasmuddin Ansari",
    class:"12",
    list:[1,2,3,4],
    report: {
        login:null,
    }
}



const getData = () => redis.get(classKey, (err, result) => {
    if (err) Promise.reject(err);

    return Promise.resolve(result);
});

const setData = (data) => {
    // console.log("Set data", new Date(), data)
    return redis.set(classKey, JSON.stringify(data));
}

const createPromise =  (data, name)=>{
    // console.log("promise", data, new Date())
    return (time = 0)=> {
        return new Promise((resolve) => {
            setTimeout(async()=>{
                const store = await getData();
                const newStore = {...JSON.parse(store), ...data}
                // console.log("Promise resolved",{store, data, newStore}, new Date())
                const delay = Number(`10${Math.random() * 10}0`)

                await new Promise((res)=>{
                    setTimeout(()=>{
                        res('ok')
                    }, delay)
                })
                const oldStore = await getData();
                console.log("Data affected", { delay, name, isEq: isEqual(JSON.parse(oldStore), JSON.parse(store))})
                await setData(newStore)
                resolve(newStore)
            }, time)
        })
    }
   
}
const p1 = createPromise({name:"Ayaan"}, 'p1');
const p2 = createPromise({report:{
    login: new Date()
}}, 'p2')

async function run(){
    redis.set(classKey, JSON.stringify(dataStore));
    // p1().then(res=>{
    //     p2()
    // })
   await Promise.all([p2(), p1()])
}
run()

const resultCheck = ()=>{
    setTimeout(async() => {
        try {
            const olderData = await getData();
            const res = JSON.parse(olderData);
            console.log(res)
        }catch(e){
            console.log(e)
        }
    }, 2000)
}
resultCheck()