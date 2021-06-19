import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('App', () => {
  const wrapper = mount(App)
  // check correct number pages for the pagination
  it('check pagination', () => {
    expect(App.data().elementsPerPage).toBe(50)
  })
  // check if loader isnt visible by default
  it('prove the loader invisible', () => {
    expect(App.data().isLoader).toBe(false)
  })
  // check if the start page is ready for selecting type of data file
  it('check the data selection', () => {
    expect(wrapper.html()).toContain('Выберите набор данных')
  })
  // check if there are no elements while the loader works
  it('check element and loader visibility', async () => {
    wrapper.setData({ isLOader: true })
    await wrapper.vm.$nextTick()
    const button = wrapper.find('button')
    expect(button.element.textContent).not.toBe('Найти')
  })
})