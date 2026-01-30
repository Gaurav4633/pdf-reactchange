import {
  Server,
  Layers,
  Cpu,
  ShieldCheck,
  Cloud,
  GitBranch,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectDetails() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-6 py-14">
      <div className="max-w-6xl mx-auto">

        {/* Hero Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold mb-6">
            <Sparkles size={18} />
            Project Overview
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            PDF Tools Web Application
          </h1>

          <p className="text-base md:text-sm text-gray-600 max-w-4xl mx-auto">
            A modern full-stack platform to convert, compress, merge, split, rotate,
            watermark and manage PDF documents using a React frontend and
            Python-Flask backend.
          </p>
        </motion.header>

        {/* Tech Stack */}
        <section className="grid md:grid-cols-2 gap-10 mb-24">
          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl shadow-xl p-10">
            <div className="flex items-center gap-3 mb-5">
              <Cpu className="text-blue-600" />
              <h2 className="text-1xl font-bold">Frontend Stack</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>React.js (Vite)</li>
              <li>Tailwind CSS</li>
              <li>React Router DOM</li>
              <li>Context API</li>
              <li>REST API Integration</li>
            </ul>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl shadow-xl p-10">
            <div className="flex items-center gap-3 mb-5">
              <Server className="text-purple-600" />
              <h2 className="text-1xl font-bold">Backend Stack</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>Python + Flask</li>
              <li>PDF processing libraries</li>
              <li>LibreOffice (headless)</li>
              <li>RESTful APIs</li>
              <li>Dockerized services</li>
            </ul>
          </motion.div>
        </section>

        {/* Overview & Features */}
        <section className="grid md:grid-cols-2 gap-10 mb-24">
          <motion.div whileHover={{ y: -6 }} className="bg-white rounded-3xl shadow-xl p-10">
            <div className="flex items-center gap-3 mb-5">
              <Layers className="text-emerald-600" />
              <h2 className="text-2xl font-bold">Key Features</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>PDF ↔ Word, Excel, Image, PPT conversions</li>
              <li>Compress, Merge, Split & Rotate PDFs</li>
              <li>Secure upload & controlled downloads</li>
              <li>Responsive modern UI</li>
            </ul>
          </motion.div>
        </section>

        {/* Security & Deployment */}
        <section className="grid md:grid-cols-2 gap-10 mb-24">
          <motion.div whileHover={{ y: -6 }} className="bg-white rounded-3xl shadow-xl p-10">
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck className="text-green-600" />
              <h2 className="text-2xl font-bold">Security</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>Temporary file cleanup</li>
              <li>Server-side validation</li>
              <li>Controlled file access</li>
            </ul>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="bg-white rounded-3xl shadow-xl p-10">
            <div className="flex items-center gap-3 mb-5">
              <Cloud className="text-sky-600" />
              <h2 className="text-2xl font-bold">Deployment</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>Docker-based backend</li>
              <li>Environment-based configs</li>
              <li>Production-ready APIs</li>
            </ul>
          </motion.div>
        </section>

        {/* Architecture */}
        <motion.section whileHover={{ y: -6 }} className="bg-white rounded-3xl shadow-xl p-12 mb-24">
          <div className="flex items-center gap-3 mb-6">
            <GitBranch className="text-orange-600" />
            <h2 className="text-2xl font-bold">System Architecture</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            The system follows a client-server architecture where React handles the UI
            and Flask manages backend APIs and processing logic.
          </p>
        </motion.section>

      </div>
    </div>
  );
}
