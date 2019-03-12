import React, { Component } from 'react'
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
import Radio from '@material-ui/core/Radio'
import Test from '../components/Test'

export default class Editor extends Component {
  state = {
    style: null,
    data: [],
    style: null,
    editor: null
  }

  componentDidMount() {
    const { template } = this.props.history.location.state
    const { style } = this.state
    console.log(style)
    function myPlugin(editor) {
      editor.BlockManager.add('my-first-block', {
        label: 'Simple block',
        content: '<div><Test /></div>'
      })
    }
    const editor = grapesjs.init({
      container: '#gjs',
      components: require(`../../html/${template}`),
      height: '500px',
      width: 'auto',
      plugins: [
        gjsBlocks,
        gjsTUI,
        gjsExport,
        gjsForm,
        gjsBlocks,
        gjsNavBar,
        gjsSlider,
        gjsTabs,
        gjsCustomCode,
        myPlugin
      ],
      pluginsOpts: {
        gjsBlocks: {},
        gjsTUI: {},
        gjsExport: {},
        gjsForm: {},
        gjsBlocks: {},
        gjsNavBar: {},
        gjsSlider: {},
        gjsTabs: {},
        gjsCustomCode: {},
        myPlugin: {}
      },
      storageManager: {
        id: 'gjs-', // Prefix identifier that will be used on parameters
        type: 'local', // Type of the storage
        autosave: true, // Store data automatically
        autoload: false, // Autoload stored data on init
        stepsBeforeSave: 1 // If autosave enabled, indicates how many changes are necessary before store method is triggered
      },
      canvas: {
        styles: [`../../css/${this.state.style}`]
      }
    })
    this.setState({ editor })
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })

    fetch('http://localhost:8080/css', {
      headers: myHeaders
    })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ data })
      })
  }

  handleChangeCss = e => {
    this.setState({ style: e.target.value })
    const { style, editor } = this.state
    const { template } = this.props.history.location.state
    const link = `../../css/${style}`
    editor.Canvas.getDocument().head.children['0'].setAttribute('href', link)
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <h1>{this.props.history.location.state.template}</h1>
        <Test />
        <form>
          {data.map((file, i) => (
            <label key={i}>
              <Radio
                onChange={this.handleChangeCss}
                value={file}
                checked={this.state.value === { file }}
              />
              {file}
            </label>
          ))}
        </form>
        <div className="panel__top">
          <div className="panel__basic-actions" />
          <div className="panel__devices" />
          <div className="panel__switcher" />
        </div>
        <div className="editor-row">
          <div className="editor-canvas">
            <div id="gjs" />
          </div>
          <div className="panel__right">
            <div className="layers-container" />
            <div className="styles-container" />
            <div className="traits-container" />
          </div>
        </div>
        <div id="blocks" />
      </div>
    )
  }
}
