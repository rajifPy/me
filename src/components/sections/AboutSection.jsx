'use client'

import { useTheme } from '@/context/ThemeContext'
import { experiences } from '@/data/experience'

export default function AboutSection({ activeTab }) {
  const { theme } = useTheme()

  const renderBio = () => (
    <div className="space-y-6">
      <h2 className={`text-2xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <span className="text-accent-blue">//</span> About Me
      </h2>
      <div className="space-y-4">
        <p>
          <span className="text-accent-blue">const</span>{' '}
          <span className="text-accent-teal">bio</span>{' '}
          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>=</span>{' '}
          {'{'}
        </p>
        <div className="pl-8 space-y-2">
          <p>
            <span className="text-accent-teal">name</span>:{' '}
            <span className="text-accent-pink">"Muhammad Rajif Al Farikhi"</span>,
          </p>
          <p>
            <span className="text-accent-teal">role</span>:{' '}
            <span className="text-accent-pink">"Data Enthusiast"</span>,
          </p>
          <p>
            <span className="text-accent-teal">location</span>:{' '}
            <span className="text-accent-pink">"Surabaya, Indonesia"</span>,
          </p>
          <p>
            <span className="text-accent-teal">interests</span>: [
            <span className="text-accent-pink">"Data Analysis"</span>,{' '}
            <span className="text-accent-pink">"Machine Learning"</span>,{' '}
            <span className="text-accent-pink">"Data Visualization"</span>]
          </p>
        </div>
        <p>{'}'}</p>
      </div>

      <div className="mt-8">
        <h3 className={`text-xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Experience</h3>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className={`p-4 border rounded ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
              <h4 className="text-accent-teal font-semibold">{exp.title}</h4>
              <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{exp.company}</p>
              <p className="text-sm text-accent-blue">{exp.period} • {exp.location}</p>
              <p className="mt-2">{exp.description}</p>
              {exp.achievements && (
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEducation = (type) => (
    <div className="space-y-6">
      <h2 className={`text-2xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <span className="text-accent-blue">//</span> Education
      </h2>
      {type === 'university' ? (
        <div className={`p-4 border rounded ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
          <h3 className="text-accent-teal font-semibold">Universitas Airlangga</h3>
          <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Bachelor of Information Systems</p>
          <p className="text-sm text-accent-blue">2020 - 2024 • Surabaya, Indonesia</p>
          <ul className="mt-4 space-y-2">
            <li>• GPA: 3.7/4.0</li>
            <li>• Focus: Data Analytics & Information Systems</li>
            <li>• Active in academic competitions</li>
          </ul>
        </div>
      ) : (
        <div className={`p-4 border rounded ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
          <h3 className="text-accent-teal font-semibold">SMA N 1 Driyorejo</h3>
          <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Science Major</p>
          <p className="text-sm text-accent-blue">2017 - 2020 • Gresik, Indonesia</p>
          <ul className="mt-4 space-y-2">
            <li>• Mathematics & Science focus</li>
            <li>• Active in extracurricular activities</li>
          </ul>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl">
      {!activeTab && renderBio()}
      {activeTab === 'bio' && renderBio()}
      {activeTab === 'university' && renderEducation('university')}
      {activeTab === 'high-school' && renderEducation('high-school')}
    </div>
  )
}
