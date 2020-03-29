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
  it("finish task method as fired by clicking checkbox removes the element with id= 0 from unfinished todos", async () => {
    const wrapper = mount(TodoList)
    let FirstListItem= wrapper.find(ListItem); 
     FirstListItem.vm.$emit('finishTask', 0);
     await Vue.nextTick();
    const result=  wrapper.vm.todos.filter(obj => {
        return obj.id===0;
     })
     expect(result==undefined) // the result is not in the filtered set

  })
})
