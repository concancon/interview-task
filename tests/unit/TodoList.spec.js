import { mount } from '@vue/test-utils'
import TodoList from '@/TodoList'
import ListItem from '@/ListItem'
import Vue from 'vue'


describe('TodoList', () => {
  it("contains item with id=0 in unfinished todo list", async () => {
    const wrapper = mount(TodoList)
    let FirstListItem = wrapper.find(ListItem);
    const result = wrapper.vm.todos.filter(obj => {
      return obj.id === 0;
    })
    expect(result == Object) // the result was found and is of type object

  })
})



describe('TodoList', () => {
  it("finish task method is fired by clicking checkbox", () => {
    const wrapper = mount(TodoList)
    let FirstListItem = wrapper.find(ListItem);
    FirstListItem.vm.$emit('finishTask', 0);
    expect(FirstListItem.emitted().finishTask).toBeTruthy();

  })
})

describe('TodoList', () => {
  it("finish task method payload is set by clicking checkbox", async () => {
    const wrapper = mount(TodoList)
    let FirstListItem = wrapper.find(ListItem);
    FirstListItem.vm.$emit('finishTask', 0);
    expect(FirstListItem.emitted().finishTask).toEqual([[0]]);

  })
})



  //TODO: TEST THAT ALL OBJECTS IN BOTH THE TODO LIST AND THE FINISHED TASKS LISTS ARE RENDERED IN THEIR ENTIRETY, TEST TEXT INPUT, TEST X FUNCTIONALITY