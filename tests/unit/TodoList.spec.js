import { mount } from '@vue/test-utils'
import TodoList from '@/TodoList'
import ListItem from '@/ListItem'
import Vue from 'vue'


describe('TodoList',  () => {
    it("contains item with id=0 in unfinished todo list", async () => {
      const wrapper = mount(TodoList)
      let FirstListItem= wrapper.find(ListItem); 
      const result=  wrapper.vm.todos.filter(obj => {
          return obj.id===0;
       })
       expect(result==Object) // the result was found and is of type object
  
    })
  })



describe('TodoList',  () => {
  it("finish task method as fired by clicking checkbox removes the element with id= 0 from unfinished todos",  () => {
    const wrapper = mount(TodoList)
    let FirstListItem= wrapper.find(ListItem); 
     FirstListItem.vm.$emit('finishTask', 0);
    //  await Vue.nextTick();
    const result=  wrapper.vm.todos.filter(obj => {
        return obj.id===0;
     })
     expect(result==undefined) // the result is not in the filtered set

  })
})



describe('TodoList',  () => {
    it("calling finish item on an item in finishedTasks moves it back to unfinished list", () => {
      const wrapper = mount(TodoList)
      const listItems=  wrapper.findAll(ListItem)
      //given a static markup lets call finish task on an already finished task
      listItems.at(4).vm.$emit('finishTask', 4);
    
      const found =  wrapper.vm.todos.filter(obj => {
        return obj.id===4;
     })
      expect(found==Object); 
    })
  })



  //TODO: TEST THAT ALL OBJECTS IN BOTH THE TODO LIST AND THE FINISHED TASKS LISTS ARE RENDERED IN THEIR ENTIRETY, TEST TEXT INPUT, TEST X FUNCTIONALITY