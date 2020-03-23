import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import ListItem from '@/ListItem.vue'

describe('ListItem.vue', () => {
  it('renders element text and when passed as argument', () => {
    let nextTodoId= 0;
    const todo = {
      id: nextTodoId++,
      text: "Call Adam",
      active: true

    }
    const wrapper = shallowMount(ListItem, {
      propsData: { todo }
    })

   expect(wrapper.props().todo.text).toBe(todo.text);
  })


})
