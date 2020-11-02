import React from 'react';
import NewProyecto from '../proyectos/NewProyecto'
import ListadoProyectos from '../proyectos/ListadoProyectos'


const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <NewProyecto/>
            <div className='proyectos'>
            <h2>Tus proyectos</h2>
            <ListadoProyectos/>
            </div>
        </aside>
     );
}
 
export default Sidebar;