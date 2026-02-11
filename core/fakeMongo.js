window.mongoDb = {

    getCollection (key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },
    /*
    Ví dụ : getCollection('users')
     key = 'users' : nơi chứa dữ liệu
     nếu dữ liệu rỗng, hàm trả về một mảng rỗng
     nếu có dữ liệu, hàm trả về một mảng user 
    */

    setCollection (key, collection) {
        localStorage.setItem(key, JSON.stringify(collection));
    },
    /*
    Ví dụ : setCollection('users', collection = [user1, user2])
    key = 'users' : nơi cần tạo hoặc thêm mới dữ liệu
    nếu key chưa tồn tại, thì thêm key và dữ liệu mới
    nếu key đã tồn tại, thay thế dữ liệu cũ
    */

    findOne (key, nameTag, data) {
        const dataArray = this.getCollection(key);

        return dataArray.find(item => {
            return item[nameTag] === data;
        }) || null;
    },
    /*
    Ví dụ : findOne('users', 'username', 'huy')
    key = 'users' : nơi chứa dữ liệu cần tìm
    nameTag = 'username' : đây là nhãn của loại dữ liệu cần tìm
    data = 'huy' : đây là dữ liệu cần tìm
    nếu có tồn tại dữ liệu (item['username'] === 'huy') thì trả về user chứa dữ liệu 'huy'
    nếu không thì trả về null
    */

    insertOne (key, data = {}) {

        data = {
            id : crypto.randomUUID(),
            ...data
        }

        const dataArray = this.getCollection(key);
        dataArray.push(data);
        this.setCollection(key, dataArray);
    },
    /*
    Ví dụ: insertOne('users', data = { id : '123', username : 'huy', password : '123456'});
    key = 'users' : nơi cần đưa dữ liệu mới vào
    data = { id : '123', username : 'huy', password : '123456'} : đây là dữ liệu mới (user : tự định nghĩa);
    dataArray.push(data) : thêm dữ liệu mới vào mảng
    gọi setCollection để thay thế dữ liệu mới
    */

    deleteOne (key, nameTag, data) {
        const dataArray = this.getCollection(key);
        const newDataArray = dataArray.filter(item => item[nameTag] !== data);
        this.setCollection(key, newDataArray);
    },

    /*
    Ví dụ : deleteOne('users', 'username', 'huy') : Xóa một object
    key = 'users' : nơi chứa dữ liệu cần xóa
    nameTag = 'username' : đây là nhãn của loại dữ liệu trong object cần xóa
    data = 'huy' : đây là dữ liệu cần tìm để xóa
    filter sẽ giữ lại các đối tượng không thỏa điều kiện
    gọi setCollection để thay thế dữ liệu mới
    */

    replaceOne (key, nameTag, objectId, newObjectData) {
        this.deleteOne(key, nameTag, objectId);
        this.insertOne(key, newObjectData);
    }
    /*
    
    
    
    

     */
}
