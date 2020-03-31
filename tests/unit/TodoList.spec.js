import { mount, shallowMount } from '@vue/test-utils'
import TodoList from '@/TodoList'
import ListItem from '@/ListItem'
import Vue from 'vue'

let wrapper = null
let nextTodoId = 0;

beforeAll(() => {
  wrapper = mount(TodoList)
})


describe('TodoList', () => {
  it("finish task method is fired by clicking checkbox", () => {

    let FirstListItem = wrapper.find(ListItem);
    FirstListItem.vm.$emit('finishTask', 0);
    expect(FirstListItem.emitted().finishTask).toBeTruthy();

  })
})

describe('TodoList', () => {
  it("finish task method payload is set by clicking checkbox", () => {

    let FirstListItem = wrapper.find(ListItem);
    FirstListItem.vm.$emit('finishTask', 0);
    expect(FirstListItem.emitted().finishTask).toEqual([[0]]);

  })
})


describe('TodoList', () => {
  it("finish task method as fired by clicking checkbox moves the element with id= 0 from unfinished todos to finished todos", async () => {

    let FirstListItem = wrapper.find(ListItem);
    expect(wrapper.find('.unfinishedTasks').html()).toContain('Call Adam');
    FirstListItem.vm.$emit('finishTask', 0);
    await Vue.nextTick();
    expect(wrapper.find('.finishedTasks').html()).toContain('Call Adam');
  })

})




  //TODO: TEST THAT ALL OBJECTS IN BOTH THE TODO LIST AND THE FINISHED TASKS LISTS ARE RENDERED IN THEIR ENTIRETY, TEST TEXT INPUT, TEST X FUNCTIONALITY