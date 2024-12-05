export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    if (totalSessions === 0 || presentCount === 0) {
        return 0;
    }
    const percentage = (presentCount / totalSessions) * 100;
    return percentage.toFixed(2);
};

export const groupAttendanceBySubject = (subjectAttendance) => {
    const attendanceBySubject = {};

    subjectAttendance.forEach((attendance) => {
        const subName = attendance.subName.subName;
        const sessions = attendance.subName.sessions;
        const subId = attendance.subName._id;

        if (!attendanceBySubject[subName]) {
            attendanceBySubject[subName] = {
                present: 0,
                absent: 0,
                sessions: sessions,
                allData: [],
                subId: subId,
                theme: {
                    primary: '#ff79c6',      // Vibrant pink for primary elements
                    secondary: '#bd93f9',    // Soft purple for secondary elements
                    warning: '#ff5555',      // Red for warnings/alerts
                    success: '#50fa7b',      // Green for success states
                    background: '#121212',   // Rich black for cards
                    text: '#e6e6e6',         // Muted white for text
                    muted: '#6272a4',        // Muted purple-blue for secondary text
                    accent: '#ffffff',       // Pure white for accents
                    gradient: {
                        start: '#121212',    // Rich black
                        end: '#2a002e'       // Very dark purple
                    }
                },
                status: {
                    excellent: sessions >= 90,  // Pink highlight
                    good: sessions >= 75,       // Purple highlight
                    warning: sessions < 75      // Red highlight
                }
            };
        }
        if (attendance.status === "Present") {
            attendanceBySubject[subName].present++;
        } else if (attendance.status === "Absent") {
            attendanceBySubject[subName].absent++;
        }
        attendanceBySubject[subName].allData.push({
            date: attendance.date,
            status: attendance.status,
            statusColor: attendance.status === "Present" ? '#50fa7b' : '#ff5555',
            sessionInfo: {
                type: "Mentorship Session",
                indicator: attendance.status === "Present" ? "✓" : "✗",
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    color: '#e6e6e6',
                    fontSize: '1rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease-in-out',
                    textShadow: attendance.status === "Present" 
                        ? '0 0 8px rgba(80, 250, 123, 0.3)' 
                        : '0 0 8px rgba(255, 85, 85, 0.3)'
                }
            }
        });
    });
    return attendanceBySubject;
}

export const calculateOverallAttendancePercentage = (subjectAttendance) => {
    let totalSessionsSum = 0;
    let presentCountSum = 0;
    const uniqueSubIds = [];

    subjectAttendance.forEach((attendance) => {
        const subId = attendance.subName._id;
        if (!uniqueSubIds.includes(subId)) {
            const sessions = parseInt(attendance.subName.sessions);
            totalSessionsSum += sessions;
            uniqueSubIds.push(subId);
        }
        presentCountSum += attendance.status === "Present" ? 1 : 0;
    });

    if (totalSessionsSum === 0 || presentCountSum === 0) {
        return 0;
    }

    const overallPercentage = (presentCountSum / totalSessionsSum) * 100;
    return overallPercentage;
};