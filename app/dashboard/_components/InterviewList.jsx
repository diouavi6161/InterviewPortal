"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';
import AddNewInterview from './AddNewInterview'; // Import the AddNewInterview component

const InterviewList = () => {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
        user && GetInterviewList();
    }, [user]);

    const GetInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id));

        console.log(result);
        setInterviewList(result);
    };

    if (!user) return null; // Return null if the user is not available

    return (
        <>
            {interviewList.length === 0 ? (
                <></> // Render AddNewInterview if there are no previous interviews
            ) : (
                <div className="font-medium text-large text-orange-200">
                    Previous Mock Interview
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 text-black gap-2">
                        {interviewList.map((interview, index) => (
                            <InterviewItemCard
                                interview={interview}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default InterviewList;
