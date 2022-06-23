const indexedDBUtil = {
    /**  打开数据库 */
    createindexDB: function (dbName,version,onsuccess,onerror,onupgradeneeded) {
        let indexedDB = window.indexedDB
      
        const request = indexedDB.open(dbName, version)
        request.onsuccess = function (event) {
            // db = event.target.result // 数据库对象
            console.log('数据库打开成功...')
            onsuccess(event);
        }

        request.onerror = function (event) {
            console.log('数据库打开失败...');
            onerror(event);
        }

        request.onupgradeneeded = function (event) {
            // 数据库创建或升级的时候会触发
            console.log('onupgradeneeded')
            // db = event.target.result
            onupgradeneeded(event);
            // if (!db.objectStoreNames.contains(storeName)) {
            //     let objectStore = db.createObjectStore(storeName, { keyPath: 'id' }) // 创建表
            //     // objectStore.createIndex('name', 'name', { unique: true }) // 创建索引 可以让你搜索任意字段
            // }
        }
    },
    /**  添加数据 */
    addData: function (db, storeName, data) {
        console.log("addData ->",db,"storeName",storeName,"data",data)
        return new Promise((resolve, reject) => {
            let request = db.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
                .objectStore(storeName) // 仓库对象
                .add(data)

            request.onsuccess = function (event) {
                resolve(event)
            }

            request.onerror = function (event) {
                reject(event)
                throw new Error(event.target.error)
            }
        })
    },
    /**  删除数据 */
    delete: function (db, storeName, id) {
        let request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id)

        request.onsuccess = function () {
            console.log('数据删除成功')
        }

        request.onerror = function () {
            console.log('数据删除失败')
        }
    },
    /**  查询数据库*/
    get: function (db, storeName, key) {
        let transaction = db.transaction([storeName]) // 事务
        let objectStore = transaction.objectStore(storeName) // 仓库对象
        let request = objectStore.get(key)

        request.onerror = function (event) {
            console.log('事务失败',event)
        }

        request.onsuccess = function (event) {
            console.log('主键查询结果: ', request.result,event);
        }
    },
    /**  更新数据 */
    update: function (db, storeName, data) {
        let request = db.transaction([storeName], 'readwrite') // 事务对象
            .objectStore(storeName) // 仓库对象
            .put(data)

        request.onsuccess = function () {
            console.log('数据更新成功')
        }

        request.onerror = function () {
            console.log('数据更新失败')
        }
    }
}
export default indexedDBUtil;