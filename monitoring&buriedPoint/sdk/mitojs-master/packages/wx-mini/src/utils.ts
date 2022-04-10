import { getBreadcrumbCategoryInWx, setUrlQuery, Severity, variableTypeDetection } from '@mitojs/utils'
import { DeviceInfo } from '@mitojs/types'
import { WxClient } from './wxClient'
import { WxBreadcrumbTypes } from '@mitojs/shared'

/**
 * 后退时需要计算当前页面地址
 * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
 */
export function getNavigateBackTargetUrl(delta: number | undefined) {
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return ''
  }
  const pages = getCurrentPages() // 在App里调用该方法，页面还没有生成，长度为0
  if (!pages.length) {
    return 'App'
  }
  delta = delta || 1
  const toPage = pages[pages.length - delta]
  return setUrlQuery(toPage.route, toPage.options)
}

/**
 * 获取wx的pages的pop
 *
 * @export
 * @return {*}
 */
export function getCurrentPagesPop() {
  return getCurrentPages().pop()
}

/**
 * 返回包含id、data字符串的标签
 * @param e wx BaseEvent
 */
export function targetAsString(e: WechatMiniprogram.BaseEvent): string {
  const id = e.currentTarget?.id ? ` id="${e.currentTarget?.id}"` : ''
  const dataSets = Object.keys(e.currentTarget.dataset).map((key) => {
    return `data-${key}=${e.currentTarget.dataset[key]}`
  })
  return `<element ${id} ${dataSets.join(' ')}/>`
}

export async function getWxMiniDeviceInfo(): Promise<DeviceInfo> {
  const { pixelRatio, screenHeight, screenWidth } = wx.getSystemInfoSync()
  const netType = await getWxMiniNetWrokType()
  return {
    ratio: pixelRatio,
    clientHeight: screenHeight,
    clientWidth: screenWidth,
    netType
  }
}

export async function getWxMiniNetWrokType(): Promise<string> {
  return new Promise((resolve) => {
    wx.getNetworkType({
      success(res) {
        resolve(res.networkType)
      },
      fail(err) {
        console.error(`获取微信小程序网络类型失败:${err}`)
        resolve('getNetWrokType failed')
      }
    })
  })
}

export function addBreadcrumbInWx(this: WxClient, data: any, type: WxBreadcrumbTypes, level = Severity.Info, params = {}) {
  return this.breadcrumb.push({
    type,
    data,
    category: getBreadcrumbCategoryInWx(type),
    level,
    ...params
  })
}
