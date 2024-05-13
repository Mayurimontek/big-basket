import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showProject,getProjectById,deleteProject } from '../Features/projectDetailsSlice';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
    debugger
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const project = useSelector((state)=>state.app.projects);
    useEffect(()=>{
        dispatch(showProject());
        console.log(project);
    },[dispatch]);
    const handleEditClick = (projectId) => {
        dispatch(getProjectById(projectId));
        navigate("/projectDetails");
    };
    const handleDeleteClick = (projectId) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            dispatch(deleteProject(projectId));
        }
        navigate("/projectList");
    };
    return (
        <div>
            <div class="container-fluid py-5">
        <div class="container py-5">
        <div className="text-center mx-auto mb-5" style={{maxWidth: '700px'}} >
                <h1 className="display-4">Bestseller Products</h1>
                <p>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which
                    looks reasonable.</p>
            </div>
            </div>
            </div>
            <div className='w-75 mx-auto'>
            <table className='table table-bordered table-stripped mt-3'>
                <thead>
                    <tr>
                        <th>Short Name</th>
                        <th>Full Name</th>
                        <th>Leading By</th>
                        <th>End Date</th>
                        <th>Technology</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                        {project.data ? (
                            project.data.map((project, index) => (
                                <tr key={index}>
                                    <td>{project.shortName}</td>
                                    <td>{project.fullName}</td>
                                    <td>{project.leadingByUserName}</td>
                                    <td>{project.expectedEndDate.split('T')[0]}</td>
                                    <td>{project.technologyStack}</td>
                                    <td><button className='btn btn-sm btn-primary m-1' onClick={() => handleEditClick(project.projectId)}>Edit</button>
                                    <button className='btn btn-sm btn-danger' onClick={() => handleDeleteClick(project.projectId)}>Delete</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='6'>Loading...</td>
                            </tr>
                        )}
                    </tbody>
            </table>
            </div>
        </div>
    );
};

export default ProjectList;