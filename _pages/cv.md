---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
 - /resume
---
{% include base_path %}

Education
======
* B.S. in Computer Engineering, Nanyang Technological University, 2024
  * Honours (Distinction)
  * Senior Middle Two Full Scholarship
  * Specialized in Artificial Intelligence

Work experience
======
* Sep 2024 - Present: Research Engineer
  * National University of Singapore, Adaptive Computing Laboratory
  * Duties:
    * Build up a skill library for research purposes
    * Develop and maintain robotics teleoperation and manipulation systems for NUS SSI robotics group
  * Supervisor: Prof. David Hsu

* Sep 2023 - Jun 2024: Research Assistant Intern
  * National University of Singapore
  * Duties: 
    * Employed Gaussian Splatting pipeline for enhanced object reconstruction
    * Enabled seamless transition from simulation to real-world application
  * Supervisor: Prof. David Hsu and Prof. Lin Shao

* Jan 2023 - Jun 2023: Machine Learning Intern
  * Continental AG Singapore
  * Duties:
    * Developed benchmarking system for visual odometry evaluation
    * Collaborated with hardware engineers for ML-sensor integration
    
* Jun 2022 - Jul 2022: Student Research Assistant Intern
  * Nanyang Technological University
  * Duties:
    * Designed and implemented knowledge-based Q&A system
    * Built system using BERT, Django, and Vue.js

Skills
======
* Programming Languages
  * Python
  * C/C++
  * Java
* Software & Frameworks
  * PyTorch
  * TensorFlow
  * Pandas
  * SciPy
* Embedded Programming

Projects
======
  <ul>{% for post in site.portfolio reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>