import React from 'react';
import styles from './Editor.module.css';
import EditorNav from './EditorNav';
import DesignDrawer from './DesignDrawer';
import WorkArea from './WorkArea';
import Viewer from './Viewer';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      design: {}, // design attributes
      elements: [], // key-value pair elementId and the current element, array index=z-index order
      zoom: 0.5,
      selected: {}, // kv pair or array index and element, with or without eleId
      // undoHistory: [], array of key-value pair of elementId and the element copy before
    };
    this.changeZoomFactor = this.changeZoomFactor.bind(this);
    this.updateElementPos = this.updateElementPos.bind(this);
    this.updateDesign = this.updateDesign.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.updateElement = this.updateElement.bind(this);
    this.addElement = this.addElement.bind(this);
  }

  componentDidMount() {
    // only loads when refresh page, not changing routes
    const { requestDesign } = this.props;
    requestDesign().then(() => {
      const { design, elements } = this.props;
      this.setState({ design, elements });
    });
  }

  setSelected(id) {
    const { elements } = this.state;
    if (id === null) {
      this.setState({ selected: {} });
    } else {
      this.setState({ selected: { [id]: elements[id] } });
    }
  }

  changeZoomFactor(fact) {
    this.setState({ zoom: fact });
  }

  updateElementPos(id, x, y) {
    const { elements, zoom } = this.state;
    elements[id].posX = x / zoom;
    elements[id].posY = y / zoom;
    this.setState({ elements });
  }

  updateElement(idx, element) {
    const { elements } = this.state;
    elements[idx] = element;
    this.setState({ elements });
  }

  addElement(element) {
    const { elements } = this.state;
    elements[elements.length] = element;
    this.setState({ elements, selected: { [elements.length]: element } });
  }

  updateDesign() {
    const { design, elements } = this.state;
    const { updateDesign } = this.props;
    design.elementsAttributes = elements;
    updateDesign(design);
  }

  render() {
    const {
      design, elements, zoom, selected,
    } = this.state;
    // return <Viewer design={design} elements={elements} zoom={zoom} />
    return (
      <div className={styles.editorContainer}>
        <EditorNav updateDesign={this.updateDesign} />
        <div className={styles.editorBottomContainer}>
          <DesignDrawer addElement={this.addElement} />
          <WorkArea
            design={design}
            elements={elements}
            zoom={zoom}
            updateElementPos={this.updateElementPos}
            selected={selected}
            setSelected={this.setSelected}
            updateElement={this.updateElement}
          />
          <div className={styles.zoomBar}>
            <button type="button" className="btn-icon" onClick={() => this.changeZoomFactor(1)}>100%</button>
            <button type="button" className="btn-icon" onClick={() => this.changeZoomFactor(0.75)}>75%</button>
            <button type="button" className="btn-icon" onClick={() => this.changeZoomFactor(0.5)}>50%</button>
            <button type="button" className="btn-icon" onClick={() => this.changeZoomFactor(0.25)}>25%</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
