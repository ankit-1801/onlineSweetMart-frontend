import axios from "axios";

const ITEM_BASE_REST_API_URl = 'http://localhost:9191/item' ;
class ItemService{

    getAllSweetItem(){
        return axios.get(ITEM_BASE_REST_API_URl +"/getAllSweetItem");
    }
    updateSweetItem(intemId , Item){
        return axios.patch(ITEM_BASE_REST_API_URl+'/updateSweetItem/'+intemId ,Item)
    }
    addSweetItem(item){
        return axios.post(ITEM_BASE_REST_API_URl+'/addSweetItem',item);
    }
    deleteSweetItem(id){
        return axios.delete(ITEM_BASE_REST_API_URl+'/deleteSweetItem/'+id);
    }
    getQuantity(id){
        return axios.get(ITEM_BASE_REST_API_URl+"/getQuantity/"+id);
    }
    getSweetItemById(id){
        return axios.get(ITEM_BASE_REST_API_URl+"/getSweetItemById/"+id)
    }
}

export default new ItemService();

