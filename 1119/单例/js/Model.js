export default class Model{
    list=new Set();
    _data;
    static _instance;
    static getInstance(){
        if(!Model._instance){
            Model._instance=new Model();
        }
        return Model._instance;
    }
    add(box){
        this.list.add(box);
    }
    remove(box){
        this.list.delete(box);
    }
    set data(v){
        this._data=v;
        this.list.forEach(t=>{
            t.update(v);
        })
    }
    get data(){
        if(!this._data) return [];
        return this._data;
    }
}