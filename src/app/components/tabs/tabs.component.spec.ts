import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TabsComponent } from './tabs.component';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let routerMock: { navigate: any; url: string };

  beforeEach(waitForAsync(() => {
    routerMock = {
      navigate: vi.fn(),
      url: '/play', // simula página ativa
    };

    TestBed.configureTestingModule({
      imports: [TabsComponent], // TabsComponent é standalone
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the TabsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call router.navigate with "about" when navigateTo("about") is called', () => {
    component.navigateTo('about');
    expect(routerMock.navigate).toHaveBeenCalledWith(['about']);
  });

  it('should call router.navigate with "play" when navigateTo("play") is called', () => {
    component.navigateTo('play');
    expect(routerMock.navigate).toHaveBeenCalledWith(['play']);
  });

  it('should return true from active("play") when URL includes "play"', () => {
    expect(component.active('play')).toBe(true);
  });

  it('should return false from active("about") when URL does not include "about"', () => {
    expect(component.active('about')).toBe(false);
  });
});
