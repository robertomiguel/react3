import React, { Component } from 'react';
import { connect } from 'react-redux'
import Ventanas from './componentes/Ventanas'
import Drawer from 'material-ui/Drawer'
import MenuPrincipal from './componentes/MenuPrincipal'
import Notificaciones from './componentes/Notificaciones'
import acciones from './acciones'
import BarraPrincipal from './componentes/BarraPrincipal'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      ventanas: [],
      activa: 0,
      open: false,
      openNotif: false,
    }
  }

  abrirVentana = (datos) => {
    this.props.dispatch(
      {
    type: 'LEER_NOTAS',
    nota: {
        titulo: datos.contenido,
        texto: datos.titulo},
      }
    )
    let index
    this.state.ventanas.forEach((m,i) => {
      if (m.id===datos.id) {
        index = i
        this.setState({activa:i})
        return
      }
    })
    if (index>-1) return
    this.setState({
          ventanas: this.state.ventanas.concat(datos),
          open: false,
          activa: this.state.ventanas.length,
        })
  }

  activarVentana = (id) => {
    this.setState({
      activa: id,
    })
  }

  cerrarVentana = () => {
    let nuevo = this.state.ventanas
    nuevo.splice(this.state.activa, 1)
    this.setState({ ventanas: nuevo,
                      activa: 0,
                  })
  }

  abrirCerrarMenu = () => {
    this.setState({ open: !this.props.estadoMenu })
  }
  estado = () => {
    this.setState({open: false})
  }
  abrirCerrarNotif = () => {
    this.setState({ openNotif: !this.props.openNotif })
  }
  cerrarNotaNotif = (id) => {
    let notas = this.props.nota
    notas.splice(id,1)
    this.props.dispatch(
      acciones.borrarNotas(notas)
    )
  }

  respuestaFacebook = (response) => {
    console.log(response);
  }

  render() {

  return (

      <div>
        <section>

          <BarraPrincipal
            activa={this.state.activa}
            ventanas={this.state.ventanas}
            cerrarVentana={this.cerrarVentana}
            abrirCerrarNotif={this.abrirCerrarNotif}
            abrirCerrarMenu={this.abrirCerrarMenu}
            activarVentana={this.activarVentana}
            notificaciones={this.props.nota.length}
          />

          <Drawer
             docked={false}
             width={350}
             open={this.state.open}
             onRequestChange={(open) => this.setState({open})}
          >
            <MenuPrincipal accion={this.abrirVentana} estado={this.estado} />
          </Drawer>
          <Drawer
             docked={false}
             width={300}
             open={this.state.openNotif}
             onRequestChange={() => this.setState({openNotif: !this.state.openNotif})}
             openSecondary={true}
             containerStyle={{background:'rgba(0, 188, 212, 0.7)'}}
          >

              <Notificaciones cerrar={this.cerrarNotaNotif} />

          </Drawer>

        </section>
        <section>
          <Ventanas
                    ventanas={this.state.ventanas}
                    activa={this.state.activa}
                    activarVentana={this.activarVentana}
                    verTabs={this.state.verTabs}
          />
        </section>
      </div>

    )
  }
}

function mapStateToProps(estado) {
  return {
    nota: estado.nota
  }
}

export default connect(mapStateToProps)(App)
