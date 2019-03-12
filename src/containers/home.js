import React from 'react'
import grapesjs from 'grapesjs'
// import gjsCKEditor from 'grapesjs-plugin-ckeditor'
import gjsTUI from 'grapesjs-tui-image-editor'
// import gjsFileStack from 'grapesjs-plugin-filestack'
import gjsExport from 'grapesjs-plugin-export'
import gjsForm from 'grapesjs-plugin-forms'
import gjsBlocks from 'grapesjs-blocks-basic'
import gjsNavBar from 'grapesjs-navbar'
import gjsSlider from 'grapesjs-lory-slider'
import gjsTabs from 'grapesjs-tabs'
import gjsCustomCode from 'grapesjs-custom-code'
import Page from '../../html/basic.html'
import Editor from './editor'

export default class Home extends React.Component {
  state = {
    value: 'basic.html',
    editor: null
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = event => {
    alert('Your template: ' + this.state.value)

    this.props.history.push({
      pathname: '/editor',
      state: { template: this.state.value }
    })
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your template:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="basic.html">Template A</option>
              <option value="basic_1.html">Template B</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
