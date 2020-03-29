import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import ListItem from '@/ListItem.vue'


let wrapper = null
let nextTodoId = 0;

beforeAll(() => {
  wrapper = shallowMount(ListItem, {
    propsData: {
      todo: {
        id: ++nextTodoId,
        text: "Call Adam",
        active: true
      }
    }
  })
})


afterEach(() => {
  wrapper.destroy()
})

describe('ListItem.vue', () => {
  it('sets id to 1 on first entry', () => {

    expect(wrapper.vm.todo.id).toBe(1);
  })

})

describe('ListItem.vue', () => {
  it('renders element text when passed as argument and sets class to active', () => {

    expect(wrapper.html()).toContain('<label class="active">Call Adam</label>');
  })

})





