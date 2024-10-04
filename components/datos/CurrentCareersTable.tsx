"use client"
import {useEffect, useState} from "react";
import {generateClient} from 'aws-amplify/data';
import {type Schema} from '@/amplify/data/resource';
import CreateCareerModal from "@/components/datos/CreateCareerModal";
import DeleteCareerModal from "@/components/datos/DeleteCareerModal";
import ActualTable from "@/components/datos/ActualTable"; // Adjust the import path as needed

// Generate the Amplify Data Client
const client = generateClient<Schema>();


export default function CurrentCareersTable() {
    const [careersData, setCareersData] = useState([]);
    const [personalityTypesData, setPersonalityTypesData] = useState([]);
    const [createCareerModalOpen, setCreateCareerModalOpen] = useState(false);
    const [editCareerModalOpen, setEditCareerModalOpen] = useState(false);
    const [deleteCareerModalOpen, setDeleteCareerModalOpen] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null);

    const fetchCareers = async () => {
        const {data: careers, errors: careersErrors} = await client.models.Career.list();
        setCareersData(careers);
    }
    const fetchPersonalityTypesData = async () => {
        const {data: personalityTypes, errors: personalityTypesErrors} = await client.models.PersonalityType.list();
        setPersonalityTypesData(personalityTypes);
    }

    const handleCreateCareer = () => {
        fetchCareers();
        fetchPersonalityTypesData()
        setCreateCareerModalOpen(false);
    }

    const handleDeleteCareer = async () => {
        const {errors: careerErrors} = await client.models.Career.delete({id: selectedCareer.id});
        if (careerErrors) {
            console.error('Error deleting Career:', careerErrors);
            return;
        }
        fetchCareers();
        fetchPersonalityTypesData()
        setDeleteCareerModalOpen(false);
    }

    useEffect(() => {
        fetchPersonalityTypesData()
        fetchCareers()
    }, []);

    return(
        <div>
            <ActualTable
                careersData={careersData}
                personalityTypesData={personalityTypesData}
                setEditCareerModalOpen={setEditCareerModalOpen}
                setCreateCareerModalOpen={setCreateCareerModalOpen}
                setDeleteCareerModalOpen={setDeleteCareerModalOpen}
                setSelectedCareer={setSelectedCareer}
            />
            <CreateCareerModal
                setOpen={setCreateCareerModalOpen}
                open={createCareerModalOpen}
                handleCreateCareer={handleCreateCareer}
            />
            <DeleteCareerModal
                handleDeleteCareer={handleDeleteCareer}
                setOpen={setDeleteCareerModalOpen}
                open={deleteCareerModalOpen}
            />
        </div>
    )
}