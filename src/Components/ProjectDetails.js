import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, updateProject } from '../Features/projectDetailsSlice';
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
    const [projectObj, setprojectObj] = useState({
        projectId: 0,
        projectLogo: "",
        shortName: "",
        fullName: "",
        startDate: "",
        leadBy: 0,
        leadingByUserName: "",
        teamSize: 0,
        expectedEndDate: "",
        technologyStack: "",
        createdDate: "",
        createdBy: 0,
        createdByUserName: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setprojectObj({ ...projectObj, [e.target.name]: e.target.value });
    }
    const project = useSelector((state) => state.app.projects);

    const handleSubmit = () => {
        console.log(projectObj);
        dispatch(createProject(projectObj));
        alert('Data saved successfully...!');
        setprojectObj({
            projectId: 0,
            projectLogo: "",
            shortName: "",
            fullName: "",
            startDate: "",
            leadBy: 0,
            leadingByUserName: "",
            teamSize: 0,
            expectedEndDate: "",
            technologyStack: "",
            createdDate: "",
            createdBy: 0,
            createdByUserName: ""
        });
        navigate("/ProjectList");
    }
    const handleUpdate = () => {
        dispatch(updateProject(projectObj));
        alert('Data updated successfully...!');
        setprojectObj({
            projectId: 0,
            projectLogo: "",
            shortName: "",
            fullName: "",
            startDate: "",
            leadBy: 0,
            leadingByUserName: "",
            teamSize: 0,
            expectedEndDate: "",
            technologyStack: "",
            createdDate: "",
            createdBy: 0,
            createdByUserName: ""
        })
        navigate("/ProjectList");
    }
    useEffect(() => {

        if (project) {
            setprojectObj(project.data);
        }
    }, [project]);
    return (
        <div>
            <div>
                <div className='w-50 mx-auto'>


                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Short Name</label>
                            <input type="text" placeholder='Enter short name' className='form-control' name="shortName" value={projectObj.shortName} onChange={handleChange} />
                        </div>
                        <div className='col-md-6'>
                            <label>Full Name</label>
                            <input type="text" placeholder='Enter Full name' className='form-control' name="fullName" value={projectObj.fullName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Start Date</label>
                            <input type="date" className='form-control' name="startDate" value={projectObj.startDate} onChange={handleChange} />
                        </div>
                        <div className='col-md-6'>
                            <label>Lead By</label>
                            <input type="text" placeholder='Enter user name' className='form-control' name="leadBy" value={projectObj.leadBy} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Team Size</label>
                            <input type="text" placeholder='Enter Team Size' className='form-control' name="teamSize" value={projectObj.teamSize} onChange={handleChange} />
                        </div>
                        <div className='col-md-6'>
                            <label>End Date</label>
                            <input type="date" className='form-control' name="expectedEndDate" value={projectObj.expectedEndDate} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Technology Stack</label>
                            <input type="text" placeholder='Enter Technology Stack' className='form-control' name="technologyStack" value={projectObj.technologyStack} onChange={handleChange} />
                        </div>
                        <div className='col-md-6'>
                            <label>Project Logo</label>
                            <input type="text" placeholder='Enter Project Logo' className='form-control' name="projectLogo" value={projectObj.projectLogo} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mt-2'>
                            {
                                projectObj.projectId == 0 && <button className='btn btn-sm btn-primary' onClick={handleSubmit}>Save</button>
                            }
                            {
                                projectObj.projectId !== 0 && <button className='btn btn-sm btn-primary' onClick={handleUpdate}>Upadte</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;