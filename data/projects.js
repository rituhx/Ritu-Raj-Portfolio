export const projects = [
  {
    id: "sign-language",
    featured: true,
    title: "Sign Language Detection",
    description:
      "Recognizes sign-language gestures from visual input and converts them into readable text for more inclusive communication.",
    problem: "Sign language is visual; many apps cannot turn gestures into text in real time.",
    solution: "A machine-learning pipeline that reads visual input and outputs readable text.",
    tech: ["Python", "NumPy", "OpenCV"],
    github: "",
    live: "",
    image: ""
  },
  {
    id: "face-attendance",
    title: "Real-Time Face Recognition Attendance",
    description:
      "Identifies people from a webcam feed and writes attendance records to MySQL and CSV.",
    tech: ["Python", "OpenCV", "face_recognition", "NumPy", "MySQL"],
    github: "",
    live: "",
    image: ""
  },
  {
    id: "sos-gps-tracker",
    title: "A9G SOS Button GPS Tracker",
    description:
      "Low-power ESP32 + A9G emergency device that publishes GPS over MQTT and sends SMS alerts.",
    tech: ["ESP32", "A9G", "MQTT", "GPS/GSM", "FreeRTOS"],
    github: "",
    live: "",
    image: ""
  },
  {
    id: "emotion-detection",
    title: "Real-Time Emotion Detection",
    description:
      "Detects faces with Haar Cascade and classifies expressions with DeepFace in a live webcam feed.",
    tech: ["Python", "OpenCV", "DeepFace", "Haar Cascade"],
    github: "",
    live: "",
    image: ""
  },
  {
    id: "motion-classification",
    title: "Human Motion Classification",
    description:
      "On-device activity classification (walking, running, sitting) from IMU data with Edge Impulse.",
    tech: ["IMU Sensors", "Edge Impulse", "Arduino"],
    github: "",
    live: "",
    image: ""
  }
];
