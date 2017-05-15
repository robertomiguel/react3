import React, { Component} from 'react';
import Api from './Api';
import Contenedor from './Contenedor';
import Accion from './Accion';

import './estilo.css';

class MenuPrincipal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cargando: true,
    }
  }

  async componentDidMount() {
    let datos = await Api.menu.getLista();
    this.setState({
      cargando: false,
      menu: datos,
    });
    console.log(`datos cargados: ${datos.length}`);
    let menu = [], cont = 0;
    let raiz = this.state.menu.filter(f=>f.directorio==='9999');
    let subDirs = (id) => {
      cont++
      let sd = this.state.menu.filter(f=>f.directorio===id)
      if (sd.length<1) return
      return (
        <ul>
          {sd.map(m=>
            <span key={m.id}>
              {m.href!=='+' ? <Accion
                {...m}
                accion={this.props.accion}
                estado={this.props.estado}
            /> :
              <Contenedor nombre={m.nombre} sub={subDirs(m.id)} clase="nombre-contenedor" /> }
            </span>
        )}
        </ul>
      )
    }
    menu.push(
      raiz.map( m => (
        <span key={m.id}>
          {m.href!=='+' ? <Accion nombre={m.nombre} /> :
          <Contenedor nombre={m.nombre} sub={subDirs(m.id)} clase="nombre-modulo" /> }
        </span>
      ))
    )
    this.setState({
      menuCompleto : menu,
      menu: null,
    })

    console.log(`Bucles: ${cont}`)

  }

  render() {
    return (
      <div className="menu_principal">
        {this.state.cargando && <div>cargando...</div>}

          <ul>
            {this.state.menuCompleto}
          </ul>

      </div>
    )
  }
}

export default MenuPrincipal;
