import Vue from 'vue'
import Router from 'vue-router'
import medicalLine from '@/components/medicalLine'
import medicalIndex from '@/components/medicalIndex'
import medicalImg from '@/components/medicalImg'
import medicalReport from '@/components/medicalReport'
import medicalRecord from '@/components/medicalRecord'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'medicalIndex',
      component: medicalIndex
    },
    /*{
      path: '/medicalLine',
      name: 'medicalLine',
      component: medicalLine
    },
    {
      path: '/medicalIndex/:index',
      name: 'medicalIndex',
      component: medicalIndex
    },*/
    {
      path: '/medicalImg',
      name: 'medicalImg',
      component: medicalImg
    },
    {
      path: '/medicalReport',
      name: 'medicalReport',
      component: medicalReport
    },
    {
      path: '/medicalRecord',
      name: 'medicalRecord',
      component: medicalRecord
    }
  ]
})
