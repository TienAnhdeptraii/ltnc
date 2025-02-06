import CallApi from "../API/CallApi";
import React, { useState, useEffect } from 'react';
import "./Chat.css";

export const Chat = () => {
  const [transcripts, setTranscripts] = useState([]);
  const [cumulativeCredits, setCumulativeCredits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = sessionStorage.getItem("userId");
        const response = await CallApi(`student/transtranscript/${id}`, "GET", null);
        setTranscripts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {transcripts.map((transcript, index) => (
        <TranscriptTable key={index} transcript={transcript} cumulativeCredits={cumulativeCredits} setCumulativeCredits={setCumulativeCredits} />
      ))}
    </div>
  );
};

const TranscriptTable = ({ transcript, cumulativeCredits, setCumulativeCredits }) => {
  const [totalCreditsRegistered, setTotalCreditsRegistered] = useState(0);
  const [totalCreditsEarnedSemester, setTotalCreditsEarnedSemester] = useState(0);
  const [totalCreditsEarned, setTotalCreditsEarned] = useState(0);
  const [semesterGPA, setSemesterGPA] = useState(0);

  useEffect(() => {
    // Tính số tín chỉ đăng ký học kỳ
    const creditsRegistered = transcript['Danh sách môn học'].reduce((acc, subject) => acc + subject['SỐ TC'], 0);
    setTotalCreditsRegistered(creditsRegistered);
    
    // Tính số tín chỉ tích lũy học kỳ
    const creditsEarnedSemester = transcript['Danh sách môn học'].reduce((acc, subject) => acc + subject['SỐ TC'], 0);
    setTotalCreditsEarnedSemester(creditsEarnedSemester);

    // Tính số tín chỉ tích lũy
    const creditsEarned = transcript['Danh sách môn học'].reduce((acc, subject) => acc + subject['SỐ TC'], 0);
    setTotalCreditsEarned(creditsEarned);

    // Cập nhật tổng số tín chỉ tích lũy ở cấp cao hơn
    setCumulativeCredits(prevCumulative => prevCumulative + creditsEarned);

    // Tính điểm trung bình học kỳ
    const semesterGPASum = transcript['Danh sách môn học'].reduce((acc, subject) => acc + subject['ĐIỂM TỔNG KẾT'] * subject['SỐ TC'], 0);
    const totalCreditsSemester = transcript['Danh sách môn học'].reduce((acc, subject) => acc + subject['SỐ TC'], 0);
    const semesterGPA = semesterGPASum / totalCreditsSemester;
    setSemesterGPA(semesterGPA);
  }, [transcript, setCumulativeCredits]);

  return (
    <div className='Container'>
      <div className='text_center'>
        <h1 id='qlsv'>Bảng điểm sinh viên</h1>
      </div>
      <div className="border_div">
        <div className="center_div">
            <div className="center_div">
              <label className="lbHKy">Học kỳ {transcript['Học kỳ']}</label>
              <br></br>
              <label className="lbDateUpdate">Ngày cập nhật điểm các môn học: {transcript['Ngày cập nhật']}</label>
              <table className="tableBD">
                <thead>
                  <tr>
                    <th>MÃ MH</th>
                    <th>TÊN MÔN HỌC</th>
                    <th>NHÓM-TỔ</th>
                    <th>SỐ TC</th>
                    <th>ĐIỂM THÀNH PHẦN</th>
                    <th>ĐIỂM THI</th>
                    <th>ĐIỂM TỔNG KẾT</th>
                  </tr>
                </thead>
                <tbody>
                  {transcript['Danh sách môn học'].map((subject, index) => (
                    <tr key={index}>
                      <td>{subject['MÃ MH']}</td>
                      <td>{subject['TÊN MÔN HỌC']}</td>
                      <td>{subject['NHÓM-TỔ']}</td>
                      <td>{subject['SỐ TC']}</td>
                      <td>{subject['ĐIỂM THÀNH PHẦN']}</td>
                      <td>{subject['ĐIỂM THI']}</td>
                      <td>{subject['ĐIỂM TỔNG KẾT']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="sum_div">
              <label className="lbTKet">Số tín chỉ đăng ký học kỳ:</label><label className="lbTKet bold">{totalCreditsRegistered}</label><br/>
              <label className="lbTKet">Số tín chỉ tích lũy học kỳ:</label><label className="lbTKet bold">{totalCreditsEarnedSemester}</label><br/>
              <label className="lbTKet">Điểm trung bình học kỳ:</label><label className="lbTKet bold">{semesterGPA}</label><br/>
              <label className="lbTKet">Số tín chỉ tích lũy:</label><label className="lbTKet bold">{cumulativeCredits}</label><br/>
              {/* Đây là nơi bạn hiển thị tổng số tín chỉ tích lũy qua các học kỳ */}
              <label className="lbTKet">Điểm trung bình tích lũy:</label><label className="lbTKet bold">{semesterGPA}</label>
            </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Chat;
