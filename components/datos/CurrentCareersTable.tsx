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
    const [careersData, setCareersData] = useState<Schema["CareerPersonalityUniversity"]["type"][]>([]);
    const [personalityTypesData, setPersonalityTypesData] = useState<Schema["PersonalityType"]["type"][]>([]);
    const [createCareerModalOpen, setCreateCareerModalOpen] = useState(false);
    const [deleteCareerModalOpen, setDeleteCareerModalOpen] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState<Schema["CareerPersonalityUniversity"]["type"]>();

    const fetchCareers = async () => {
        const {data: careers, errors: careersErrors} = await client.models.CareerPersonalityUniversity.list();
        setCareersData(careers);
    }
    const fetchPersonalityTypesData = async () => {
        const {data: personalityTypes, errors: personalityTypesErrors} = await client.models.PersonalityType.list();
        setPersonalityTypesData(personalityTypes);
    }

    const handleCreateCareer = () => {
        setCreateCareerModalOpen(false);
    }

    const handleDeleteCareer = async () => {
        const {errors: careerErrors} = await client.models.CareerPersonalityUniversity.delete({id: selectedCareer.id});
        if (careerErrors) {
            console.error('Error deleting Career:', careerErrors);
            return;
        }
        setDeleteCareerModalOpen(false);
    }

    useEffect(() => {
        fetchPersonalityTypesData()
        fetchCareers()
    }, []);

    useEffect(() => {
        const sub = client.models.CareerPersonalityUniversity.observeQuery().subscribe({
            next: ({ items }) => {
                setCareersData([...items]);
            },
        });

        return () => sub.unsubscribe();
    }, []);

    useEffect(() => {
        const sub = client.models.PersonalityType.observeQuery().subscribe({
            next: ({ items }) => {
                setPersonalityTypesData([...items]);
            },
        });

        return () => sub.unsubscribe();
    }, []);

    return(
        <div>
            <ActualTable
                careersData={careersData}
                personalityTypesData={personalityTypesData}
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