/*
 * @description: 编辑器
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-08-30 08:07:51
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-09 08:52:13
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
@Module({ namespaced: true, dynamic: true, store, name: 'common' })
class layout extends VuexModule implements layoutState {
  public leftSideCollapse = false
  @Mutation
  public setLeftSideCollapse(collapse: boolean) {
    this.leftSideCollapse = collapse
  }
}
export const layoutModule = getModule(layout)
