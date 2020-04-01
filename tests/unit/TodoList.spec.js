import { mount, shallowMount } from '@vue/test-utils'
import TodoList from '@/TodoList'
import ListItem from '@/ListItem'
import NewItem from "@/NewItem.vue";
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

describe('TodoList', () => {
  it("finish task method as fired by clicking checkbox moves the element with id= 3 from finished todos to unfinished todos", async () => {

    let FirstListItem = wrapper.findAll(ListItem);
    expect(wrapper.find('.finishedTasks').html()).toContain('Call Adam');
    FirstListItem.at(4).vm.$emit('finishTask', 0);
    await Vue.nextTick();
    expect(wrapper.find('.unfinishedTasks').html()).toContain('Call Adam');
  })

})

describe('TodoList', () => {
  it("finish task method as fired by clicking X removes the element with id= 0", async () => {

    let FirstListItem = wrapper.findAll(ListItem);
    expect(wrapper.find('.unfinishedTasks').html()).toContain('Call Adam');
    FirstListItem.at(3).vm.$emit('remove', 0);
    await Vue.nextTick();
    expect(wrapper.contains('Call Adam')).toBe(false);
  })

})

describe('TodoList', () => {
  it("add task method as fired by hitting enter adds a new todo task to list", async () => {

    let newItem= wrapper.find(NewItem);
    newItem.vm.$emit('input', 'test new task');
    wrapper.find('button').trigger('click');
    await Vue.nextTick();
    expect(wrapper.find('.unfinishedTasks').html()).toContain('test new task');
    
   
  })

})

