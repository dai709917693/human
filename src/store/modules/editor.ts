import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { VNode } from 'vue'

export interface treeData {
  value: string
  label: string
  vnode: VNode | null
  compProps: any
  nativeProps: any
  children: treeData[]
}
export interface editorState {
  editorCommonClass: { name: string; value: string }[]
  editorContent: treeData[]
  editorCurrentData: treeData | null
}
@Module({ namespaced: true, dynamic: true, store, name: 'editor' })
class editor extends VuexModule implements editorState {
  public editorCommonClass: { name: string; value: string }[] = []
  public editorContent: treeData[] = []
  public editorCurrentData: treeData | null = null
  public editorRefresh = new Date().getTime()
  @Mutation
  public addEditorCommonClass({
    name,
    value
  }: {
    name: string
    value: string
  }) {
    this.editorCommonClass.push({ name, value })
  }

  @Mutation
  public setEditorContent(content: treeData[]) {
    this.editorContent = content
  }
  @Mutation
  public pushEditorContent(node: treeData) {
    this.editorContent.push(node)
  }
  @Mutation
  public setEditorCurrentData(data: treeData) {
    this.editorCurrentData = data
  }
  @Mutation
  public setEditorRefresh() {
    this.editorRefresh = new Date().getTime()
  }

  @Action({ commit: 'setEditorRefresh' })
  public repaint() {}
}
export const editorModule = getModule(editor)
