/*
 * @description: 编辑器
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-08-30 08:07:51
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-10-08 09:20:21
 */
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
export interface layoutState {
  leftSideCollapse: boolean
}
@Module({ namespaced: true, dynamic: true, store, name: 'layout' })
class layout extends VuexModule implements layoutState {
  public leftSideCollapse = false
  @Mutation
  public setLeftSideCollapse(collapse: boolean) {
    this.leftSideCollapse = collapse
  }
}
export const layoutModule = getModule(layout)
