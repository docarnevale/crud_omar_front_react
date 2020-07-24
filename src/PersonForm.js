import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
class PersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          id: -1,
          name: 'Prueba',
          dni: 11111111,
          email: 'bla@bla.com',
          list: null
        };
        this.list = null;
        this.routeDelete=  "http://localhost:8080/borrarpersona";
        this.routeCreate= "http://localhost:8080/crearpersona";
        this.routeUpdate= "http://localhost:8080/actualizarpersona";
        this.routeReadAll= "http://localhost:8080/todaslaspersonas";
        
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDni = this.handleChangeDni.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.personEdit = this.personEdit.bind(this);
        
        this.refreshList();
        console.table(this.list);
    }
    handleChangeName(event) {
        this.setState({name : event.target.value});
    }
    handleChangeDni(event) {
        this.setState({dni : event.target.value});
    }
    handleChangeEmail(event) {
        this.setState({email : event.target.value});
    }
    handleClearForm(event)
    {
        //event.preventDefault();
        this.setState({name : ""});
        this.setState({dni : ""});
        this.setState({email : ""});
        this.setState({id : -1});
    }
    handleSubmitForm(event)
    {
        event.preventDefault();
        
        var uri;
        uri = (this.state.id <0) ? this.routeCreate : this.routeUpdate;
        //ejecuta POST
        axios.post(uri,      //uri
        JSON.stringify(this.state),   //data
        { headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          }
        }).then(
            resp=>{
            console.log(resp);
            this.refreshList();
         });
    }
    
    personEdit(index){
          //evt = el indice de la lista para obtener el object
          //alert();
          console.log(index);
          var obj = this.list[index-1];
          this.setState({name: obj.name});
          this.setState({dni: obj.dni});
          this.setState({email: obj.email});
          this.setState({id: obj.id});
          //this.state =  obj;
          //this.name = "";
          
    }
    personDelete(id, index){
        //ejecuta POST
        /*axios.post("http://localhost:8080/unapersona/",      //uri
        JSON.stringify(this.form),   //data
        { headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          }
        }).then(
            resp=>{
            console.log(resp);
            this.refreshList();
         });*/
        if(window.confirm("Confirma eliminar la persona " + id + "?"))
        {
            
            axios.post(this.routeDelete, //uri
            {"id": id},//data
            { headers: { //header por CROS
             'Content-type': 'application/x-www-form-urlencoded',
             }
            }).then(   //response
               resp=>{
               console.log(resp);
            });
            
            this.refreshList();
        }
      }
    refreshList()
    {
      axios.get(this.routeReadAll, 
      { headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        }
      }).then(
          resp=>{
            //console.table(resp.data);
            this.setState({list: resp.data});
            this.list = resp.data;
            this.listPersons = this.list.map((p, i) =>
                {
                i++;
                return (<tr class="hover-hand" data-target="tooltip" title="Click para editar">
                    <td>
                        { p.id }
                    </td>
                    <td>
                        { p.name }
                    </td>
                    <td>
                        { p.dni }
                    </td>
                    <td>
                        { p.email }
                    </td>
                    <td>
                        <span class="fa fa-edit text-warning fa-2x personButton" data-target="tooltip" title="Editar" onClick={() => this.personEdit(i)}></span>
                    </td>
                    <td>
                        <span class="fa fa-close text-danger fa-2x personButton" data-target="tooltip" title="Eliminar" onClick={() => this.personDelete(p.id, i)}></span>
                       
                    </td>
                </tr>)
                }
            );
            this.setState({other: "work"});
       });
    }
    render() {
         //const numbers = [1, 2, 3, 4, 5];
        
        return <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                  Mantenimiento Persona 
                </div>
                <div class="card-body">
                    <div class="d-none" id="txtId">
                    {this.id}
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <input class="form-control"  value={this.state.name} onChange={this.handleChangeName}  placeholder="Nombre"/>
                        </div>
                        <div class="col-6">
                            <input class="form-control"  value={this.state.dni} onChange={this.handleChangeDni}  placeholder="D.N.I."/>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-12">
                            <input class="form-control"  value={this.state.email} onChange={this.handleChangeEmail}  placeholder="E-mail"/>
                        </div>
                    </div>


                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-6">
                            <button class="btn btn-success col" onClick={this.handleSubmitForm} >Guardar</button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-danger col" onClick={this.handleClearForm} >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-12 col-md-6">
        <table class="table table-hover table-striped table-borderless">
            <thead>
            <th>ID</th>
            <th>Nombre</th>
            <th>D.N.I.</th>
            <th>E-mail</th>
            <th></th>
            <th></th>
            </thead>
            <tbody>
            {this.listPersons}
            </tbody>
        </table>

        </div>
        </div>
        ;

    }
}
export default PersonForm;