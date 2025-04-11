import React from 'react'
import AboutSection1 from '../../components/core/About/AboutSection1'
import AboutSection2 from '../../components/core/About/AboutSection2'
import AboutSection3 from '../../components/core/About/AboutSection3'
import AboutSection4 from '../../components/core/About/AboutSection4'
import GetInTouch from '../../components/core/About/GetInTouch'

const About = () => {
  return (
    <section className=' w-full'>

        <AboutSection1/>
        <AboutSection2/>
        <AboutSection3/>
        <AboutSection4/>
        <GetInTouch/>


      
    </section>
  )
}

export default About
